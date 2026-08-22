/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogsService } from './audit-logs.service';
import { DatabaseService } from '@/database/database.service';
import { AuditAction, AuditEntity } from '@prisma/client';

describe('AuditLogsService', () => {
  let service: AuditLogsService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditLogsService,
        {
          provide: DatabaseService,
          useValue: {
            auditLog: {
              findMany: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuditLogsService>(AuditLogsService);
    prisma = module.get<DatabaseService>(DatabaseService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllAuditLogs', () => {
    const audit_logs = [
      {
        userId: '1',
        action: AuditAction.CREATE,
        entity: AuditEntity.PRODUCT,
        entityId: 'entity-1',
        description: 'create product',
      },

      {
        userId: '1',
        action: AuditAction.CREATE,
        entity: AuditEntity.USER,
        entityId: 'entity-2',
        description: 'create user',
      },
    ];

    it('should return all auditLogs without pagination when page/limit are not provided', async () => {
      prisma.auditLog.findMany.mockResolvedValue(audit_logs);

      const result = await service.getAllAuditLogs();
      expect(result).toEqual(audit_logs);

      expect(prisma.auditLog.findMany).toHaveBeenCalledWith({
        where: { user: {} },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should call findMany with the correct search filter', async () => {
      const search_auditLogs = {
        name: 'Renan Victor',
        email: 'renan@test.com',
        deletedAt: null,
      };

      prisma.auditLog.findMany.mockResolvedValue(search_auditLogs);

      const result = await service.getAllAuditLogs('Renan Victor');

      expect(result).toEqual(search_auditLogs);
      expect(prisma.auditLog.findMany).toHaveBeenCalledWith({
        where: {
          user: {
            OR: [
              { name: { contains: 'Renan Victor', mode: 'insensitive' } },
              { email: { contains: 'Renan Victor', mode: 'insensitive' } },
            ],
          },
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },

        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return paginated auditLogs when page and limit are provided', async () => {
      prisma.auditLog.findMany.mockResolvedValue(audit_logs);
      prisma.auditLog.count.mockResolvedValue(20);

      const result = await service.getAllAuditLogs(undefined, 2, 10);

      expect(result).toEqual({
        data: audit_logs,
        meta: {
          page: 2,
          limit: 10,
          total: 20,
          totalPages: 2,
        },
      });
    });

    it('should calculate skip correctly based on page and limit', async () => {
      prisma.auditLog.findMany.mockResolvedValue(audit_logs);
      prisma.auditLog.count.mockResolvedValue(20);

      await service.getAllAuditLogs(undefined, 3, 10);

      expect(prisma.auditLog.findMany).toHaveBeenCalledWith({
        where: {
          user: {},
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },

        skip: 20,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });

      expect(prisma.auditLog.count).toHaveBeenCalledWith({
        where: {
          user: {},
        },
      });
    });

    it('should round totalPages up when total is not evenly divisible by limit', async () => {
      prisma.auditLog.findMany.mockResolvedValue(audit_logs);
      prisma.auditLog.count.mockResolvedValue(21);

      const result = await service.getAllAuditLogs(undefined, 1, 10);

      expect((result as any).meta.totalPages).toBe(3);
    });

    it('should combine search filter with pagination', async () => {
      const search_auditLogs = {
        name: 'Renan Victor',
        email: 'renan@test.com',
        deletedAt: null,
      };

      prisma.auditLog.findMany.mockResolvedValue(search_auditLogs);
      prisma.auditLog.count.mockResolvedValue(20);

      await service.getAllAuditLogs('Renan Victor', 1, 10);

      expect(prisma.auditLog.findMany).toHaveBeenCalledWith({
        where: {
          user: {
            OR: [
              { name: { contains: 'Renan Victor', mode: 'insensitive' } },
              { email: { contains: 'Renan Victor', mode: 'insensitive' } },
            ],
          },
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },

        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });

      expect(prisma.auditLog.count).toHaveBeenCalledWith({
        where: {
          user: {
            OR: [
              { name: { contains: 'Renan Victor', mode: 'insensitive' } },
              { email: { contains: 'Renan Victor', mode: 'insensitive' } },
            ],
          },
        },
      });
    });
  });
});
