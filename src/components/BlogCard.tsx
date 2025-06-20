
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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

interface BlogCardProps {
  blog: Blog;
  onView: (blog: Blog) => void;
  onEdit?: (blog: Blog) => void;
  onDelete?: (blogId: string) => void;
  showActions?: boolean;
}

export function BlogCard({ blog, onView, onEdit, onDelete, showActions = false }: BlogCardProps) {
  const { user } = useAuth();
  const isOwner = user?.id === blog.author_id;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      {blog.featured_image && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={blog.featured_image} 
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-gray-100">
            {blog.title}
          </CardTitle>
          {showActions && isOwner && (
            <div className="flex gap-1 flex-shrink-0">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(blog);
                  }}
                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(blog.id);
                  }}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          By {blog.author_name} • {formatDistanceToNow(new Date(blog.published_at))} ago
        </div>
        
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {blog.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{blog.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {blog.excerpt || blog.content.substring(0, 150) + '...'}
        </p>
        
        <Button 
          onClick={() => onView(blog)}
          variant="outline" 
          size="sm"
          className="w-full group"
        >
          <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
          Read More
        </Button>
      </CardContent>
    </Card>
  );
}
