import { Module } from '@nestjs/common';
import { PostsController } from './posts/api/posts.controller';
import { BlogsService } from './blogs/application/blogs.service';
import { PostsService } from './posts/application/posts.service';
import { BlogsController } from './blogs/api/blogs.controller';
import { CommentsController } from './comments/api/comments.controller';
import { CommentsService } from './comments/application/comments.service';
import { BlogIdIsExistConstraint } from './blogs/api/validation/blogId-is-exist.decorator';
import { UserAccountsModule } from '../user-accounts/user-accounts.module';
import { BlogsSqlRepository } from './blogs/infrastructure/blogs.sql.repository';
import { BlogsSqlQueryRepository } from './blogs/infrastructure/blogs.sql.query-repository';
import { PostsSqlRepository } from './posts/infrastructure/posts.sql.repository';
import { PostsSqlQueryRepository } from './posts/infrastructure/posts.sql.query-repository';
import { UuidProvider } from '../../core/helpers/uuid.provider';
import { CommentsSqlRepository } from './comments/infrastructure/comments.sql.repository';
import { CommentsSqlQueryRepository } from './comments/infrastructure/comments.sql.query-repository';
import { LikesForCommentSqlRepository } from './likes/infrastructure/likes-for-comment.sql.repository';
import { LikesForPostSqlRepository } from './likes/infrastructure/likes-for-post.sql.repository';

@Module({
  imports: [UserAccountsModule],
  controllers: [BlogsController, PostsController, CommentsController],
  providers: [
    BlogsService,
    BlogsSqlRepository,
    BlogsSqlQueryRepository,
    PostsService,
    PostsSqlRepository,
    PostsSqlQueryRepository,
    CommentsService,
    CommentsSqlQueryRepository,
    CommentsSqlRepository,
    LikesForCommentSqlRepository,
    LikesForPostSqlRepository,
    BlogIdIsExistConstraint,
    UuidProvider,
  ],
})
export class BloggersPlatformModule {}
