from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///community.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'content': self.content,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        }

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.order_by(Post.timestamp.desc()).limit(10).all()
    return jsonify([post.to_dict() for post in posts])

@app.route('/posts', methods=['POST'])
def add_post():
    data = request.get_json()
    name = data.get('name')
    location = data.get('location')
    content = data.get('content')

    if not name or not location or not content:
        return jsonify({'error': 'Missing required fields'}), 400

    new_post = Post(name=name, location=location, content=content)
    db.session.add(new_post)
    db.session.commit()

    # Ensure only the latest 10 posts are kept
    posts_count = Post.query.count()
    if posts_count > 10:
        oldest_post = Post.query.order_by(Post.timestamp).first()
        db.session.delete(oldest_post)
        db.session.commit()

    return jsonify(new_post.to_dict()), 201

if __name__ == '__main__':
    # Use app context to initialize the database
    with app.app_context():
        db.create_all()
    app.run(debug=True)
