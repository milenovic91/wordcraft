import {Router} from 'express';
import Article from '../models/Article';

const router = Router();

/**
 * get all articles
 * @queryParam limit
 * @queryParam offset
 * @queryParam favorited
 * @queryParam author
 */
router.get('/', async (req, res) => {
  let query = {};
  let limit = 10;
  let offset = 0;
  if (req.query.limit !== 'undefined') {
    limit = Number(req.query.limit);
  }
  if (req.query.offset !== 'undefined') {
    offset = Number(req.query.offset);
  }
  
  try {
    let results = await Promise.all([
      Article.find(query)
        .limit(limit)
        .skip(offset)
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Article.count(query).exec()
    ]);
    res.json({
      articles: results[0].map(articleMapper),
      articlesCount: results[1]
    });
  } catch (e) {}
});

const articleMapper = (article, _user) => ({
  slug: article.slug,
  title: article.title,
  description: article.description,
  body: article.body,
  tagList: article.tagList,
  createdAt: article.createdAt,
  updatedAt: article.updatedAt,
  favorited: false,
  favoritesCount: article.favoritesCount,
  author: {
    username: article.author.username,
    bio: article.author.bio,
    image: article.author.image,
    following: false
  }
});

export default router;
