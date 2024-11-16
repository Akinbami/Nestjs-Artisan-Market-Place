import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { totp } from 'otplib';

export default class Crypto {
  static config: ConfigService;

  constructor(configService: ConfigService) {
    Crypto.config = configService;
  }

  public static bcrypt = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };

  public static async validateBcrypt(
    text: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }

  public static otp = (len = 6): string => {
    totp.options = { digits: len };
    return totp.generate(Crypto.config?.get<string>('OTP_SECRET') || 'secret');
  };

  public static validateOtp = (otp: string): boolean => {
    return totp.check(
      otp,
      Crypto.config?.get<string>('OTP_SECRET') || 'secret',
    );
  };
}
