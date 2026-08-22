/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogsController } from './audit-logs.controller';
import { AuditLogsService } from './audit-logs.service';
import { AuditAction, AuditEntity } from '@prisma/client';

describe('AuditLogsController', () => {
  let controller: AuditLogsController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditLogsController],
      providers: [
        {
          provide: AuditLogsService,
          useValue: {
            getAllAuditLogs: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuditLogsController>(AuditLogsController);
    service = module.get<AuditLogsService>(AuditLogsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllAuditLogs', () => {
    it('should call service with search only when page/limit are not provided', async () => {
      service.getAllAuditLogs.mockResolvedValue([]);

      await controller.getAllAuditLogs('Renan Victor');

      expect(service.getAllAuditLogs).toHaveBeenCalledWith(
        'Renan Victor',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
    });

    it('should convert page and limit from string to number', async () => {
      service.getAllAuditLogs.mockResolvedValue({
        data: [],
        meta: { page: 2, limit: 10, total: 0, totalPages: 0 },
      });

      await controller.getAllAuditLogs(undefined, '2', '10');

      expect(service.getAllAuditLogs).toHaveBeenCalledWith(
        undefined,
        2,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
      );
    });

    it('should return whatever the service returns', async () => {
      const auditLog = {
        userId: 'user-1',
        action: AuditAction.CREATE,
        entity: AuditEntity.PRODUCT,
        entityId: 'entity-1',
        description: 'create product',
      };
      const paginated = {
        data: auditLog,
        meta: { page: 1, limit: 10, total: 1, totalPages: 1 },
      };
      service.getAllAuditLogs.mockResolvedValue(paginated);

      const result = await controller.getAllAuditLogs(
        undefined,
        '1',
        '10',
        'CREATE',
        'PRODUCT',
        undefined,
        'user-1',
      );

      expect(result).toEqual(paginated);
    });
  });
});
