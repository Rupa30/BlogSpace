
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateBlog } from '@/hooks/useBlogs';

export function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  
  const createBlogMutation = useCreateBlog();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createBlogMutation.mutate({
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt.trim() || undefined
    });

    if (createBlogMutation.isSuccess) {
      setTitle('');
      setContent('');
      setExcerpt('');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              required
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt (Optional)</Label>
            <Input
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of your blog post..."
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              className="min-h-[300px]"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={createBlogMutation.isPending}
          >
            {createBlogMutation.isPending ? 'Publishing...' : 'Publish Blog'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
