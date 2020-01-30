import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  // note: unique not validator - it creates index on the field
  slug: {type: String, lowercase: true, unique: true},
  title: {type: String, minlength: 1},
  description: String,
  body: String,
  /**
   * createdAt and updatedAt are provided by timestamps option
   */
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  favoritesCount: {type: Number, default: 0},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

//ArticleSchema.plugin(uniqueValidator, {message: 'is already taken'});  ???

schema.methods.setupSlug = function() {
  // TODO - improve this
  let titleParts = this.title.toLowerCase().split(' ');
  this.slug = titleParts.join('-') + Math.floor(Math.random() * 10000);
}

schema.pre('validate', function(next) {
  if (!this.slug) {
    this.setupSlug();
  }
  next();
});

export default mongoose.model('Article', schema);
