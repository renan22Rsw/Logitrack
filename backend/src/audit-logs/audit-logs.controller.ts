import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { AuditAction, AuditEntity, AuditLog, Role } from '@prisma/client';
import { AuditLogsPaginated } from '@/types/audit-logs';

@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllAuditLogs(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('action') action?: AuditAction,
    @Query('entity') entity?: AuditEntity,
    @Query('role') role?: Role,
    @Query('userId') userId?: string,
  ): Promise<AuditLog[] | AuditLogsPaginated> {
    return this.auditLogsService.getAllAuditLogs(
      search,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
      action,
      entity,
      role,
      userId,
    );
  }
}
