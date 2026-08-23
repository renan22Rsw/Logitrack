import { Injectable } from '@nestjs/common';
import { DatabaseService as PrismaService } from '@/database/database.service';
import { AuditAction, AuditEntity, AuditLog, Role } from '@prisma/client';
import { AuditLogsPaginated } from '@/types/audit-logs';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllAuditLogs(
    search?: string,
    page?: number,
    limit?: number,
    action?: AuditAction,
    entity?: AuditEntity,
    role?: Role,
    userId?: string,
  ): Promise<AuditLog[] | AuditLogsPaginated> {
    const where = {
      ...(action && { action }),
      ...(entity && { entity }),
      ...(userId && { userId }),

      user: {
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }),

        ...(role && {
          role,
        }),
      },
    };

    const include = {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isDemo: true,
        },
      },
    };

    if (!page || !limit) {
      return this.prisma.auditLog.findMany({
        where,
        include,
        orderBy: { createdAt: 'desc' },
      });
    }

    const skip = (page - 1) * limit;

    const [auditLogs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        include,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      data: auditLogs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
