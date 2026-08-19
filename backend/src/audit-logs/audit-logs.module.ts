import { Module } from '@nestjs/common';
import { AuditLogsController } from './audit-logs.controller';
import { AuditLogsService } from './audit-logs.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [AuditLogsController],
  providers: [AuditLogsService, DatabaseService],
})
export class AuditLogsModule {}
