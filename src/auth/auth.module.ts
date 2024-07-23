import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { key } from './dto/constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: key.secret,
      signOptions: { expiresIn: '12d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
