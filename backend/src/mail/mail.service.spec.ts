/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { ResendService } from 'nestjs-resend';

describe('MailService', () => {
  let service: MailService;
  let resendService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: ResendService,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    resendService = module.get<ResendService>(ResendService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendForgotPasswordEmail', () => {
    it('should send an email with the correct recipient, subject and body content', async () => {
      resendService.send.mockResolvedValue({});

      await service.sendForgotPasswordEmail(
        'user@test.com',
        'User Name',
        'temp-pass-123',
      );

      expect(resendService.send).toHaveBeenCalledTimes(1);

      const callArgs = resendService.send.mock.calls[0][0];

      expect(callArgs.to).toBe('user@test.com');
      expect(callArgs.from).toBe('onboarding@resend.dev');
      expect(callArgs.subject).toBe('Resetar senha');
      expect(callArgs.html).toContain('User Name');
      expect(callArgs.html).toContain('user@test.com');
      expect(callArgs.html).toContain('temp-pass-123');
    });

    it('should propagate an error if the email provider fails', async () => {
      resendService.send.mockRejectedValue(new Error('Resend API error'));

      await expect(
        service.sendForgotPasswordEmail('user@test.com', 'User', 'temp-pass'),
      ).rejects.toThrow('Resend API error');
    });
  });

  describe('sendUserCreatedByAdminEmail', () => {
    it('should send an email with the correct recipient, subject and body content', async () => {
      resendService.send.mockResolvedValue({});

      await service.sendUserCreatedByAdminEmail(
        'newuser@test.com',
        'New User',
        'temp-pass-456',
      );

      expect(resendService.send).toHaveBeenCalledTimes(1);

      const callArgs = resendService.send.mock.calls[0][0];

      expect(callArgs.to).toBe('newuser@test.com');
      expect(callArgs.from).toBe('onboarding@resend.dev');
      expect(callArgs.subject).toBe('Sua conta foi criada');
      expect(callArgs.html).toContain('New User');
      expect(callArgs.html).toContain('newuser@test.com');
      expect(callArgs.html).toContain('temp-pass-456');
    });
  });

  describe('sendUserUpdatedByAdminEmail', () => {
    it('should send an email with the correct recipient, subject and body content', async () => {
      resendService.send.mockResolvedValue({});

      await service.sendUserUpdatedByAdminEmail('user@test.com', 'User Name');

      expect(resendService.send).toHaveBeenCalledTimes(1);

      const callArgs = resendService.send.mock.calls[0][0];

      expect(callArgs.to).toBe('user@test.com');
      expect(callArgs.from).toBe('onboarding@resend.dev');
      expect(callArgs.subject).toBe('Seus dados foram atualizados');
      expect(callArgs.html).toContain('User Name');
    });
  });
});
