import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileUpdateDto } from './interface/profile-update-dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @ApiOperation({ summary: '프로필 수정' })
    @ApiOkResponse({ type: ProfileUpdateDto })
    @ApiBody({ type: ProfileUpdateDto })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('/edit')
    async profileUpdate(@Req() req, @Body() profileInfo: ProfileUpdateDto) {
        return await this.profileService.profileUpdate(req, profileInfo);
    }

    @ApiOperation({ summary: '프로필 데이터 불러오기' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getProfile(@Req() req) {
        return await this.profileService.getProfile(req);
    }
}
