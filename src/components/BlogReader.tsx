
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, User } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  author_id: string;
  author_name: string;
  published_at: string;
  tags: string[] | null;
  featured_image: string | null;
}

interface BlogReaderProps {
  blog: Blog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlogReader({ blog, open, onOpenChange }: BlogReaderProps) {
  if (!blog) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-bold mb-4">{blog.title}</DialogTitle>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author_name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDistanceToNow(new Date(blog.published_at))} ago</span>
            </div>
          </div>
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </DialogHeader>
        
        <div className="mt-6">
          {blog.featured_image && (
            <div className="mb-6">
              <img 
                src={blog.featured_image} 
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
