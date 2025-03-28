import { LikeStatus } from '../../../../likes/domain/like.entity';
import { Post } from '../../../domain/post.sql.entity';

export class PostViewModel {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
  extendedLikesInfo: {
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus;
    newestLikes: {
      addedAt: Date;
      userId: string;
      login: string;
    }[];
  };

  static mapToView(post: Post, currentStatus: LikeStatus): PostViewModel {
    const model = new PostViewModel();
    const newestLikes =
      post.addedAt && post.userId && post.login
        ? [
            {
              addedAt: post.addedAt,
              userId: post.userId,
              login: post.login,
            },
          ]
        : [];
    model.id = post.id;
    model.title = post.title;
    model.shortDescription = post.shortDescription;
    model.content = post.content;
    model.blogId = post.blogId;
    model.blogName = post.blogName;
    model.createdAt = post.createdAt;
    model.extendedLikesInfo = {
      likesCount: post.likesCount,
      dislikesCount: post.dislikesCount,
      myStatus: currentStatus,
      newestLikes: newestLikes,
    };
    return model;
  }
}
