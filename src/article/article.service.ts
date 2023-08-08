import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entites/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article>) { }

    async createArticle(req, articleInfo) {
        const userId = req.user.userId;
        const { title, content } = articleInfo;

        try {
            return await this.articleRepository
                .createQueryBuilder()
                .insert()
                .into(Article)
                .values({ title: title, content: content, User: userId })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    async updateArticle(req, articleId, articleInfo) {
        const userId = req.user.userId;
        const { title, content } = articleInfo;

        try {
            return await this.articleRepository
                .createQueryBuilder()
                .update(Article)
                .set({ title: title, content: content })
                .where('id = :articleId', { articleId: articleId })
                .andWhere('User = :userId', { userId: userId })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    async getArticle(articleId) {
        try {
            return await this.articleRepository
                .createQueryBuilder()
                .select('articles')
                .from(Article, 'articles')
                .where('id = id', { id: articleId })
                .getOne();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }

    async deleteArticle(req, articleId) {
        const userId = req.user.userId;

        try {
            return await this.articleRepository
                .createQueryBuilder()
                .delete()
                .from(Article)
                .where('id = :articleId', { articleId: articleId })
                .andWhere('User = :userId', { userId: userId })
                .execute();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }
}