
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCreateBlog } from '@/hooks/useBlogs';
import { useUploadImage } from '@/hooks/useBlogOperations';
import { useTags, useCreateTag } from '@/hooks/useTags';
import { X, Upload, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';


export function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [newTag, setNewTag] = useState('');
  
  const createBlogMutation = useCreateBlog();
  const uploadImageMutation = useUploadImage();
  const createTagMutation = useCreateTag();
  const { data: availableTags } = useTags();
  const { user } = useAuth();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImageMutation.mutateAsync(file);
      setFeaturedImage(imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    
    const tagName = newTag.trim().toLowerCase();
    
    try {
      await createTagMutation.mutateAsync(tagName);
      if (!selectedTags.includes(tagName)) {
        setSelectedTags([...selectedTags, tagName]);
      }
      setNewTag('');
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createBlogMutation.mutate({
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt.trim() || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      featured_image: featuredImage || undefined,
    });
  };

  useEffect(() => {
    if (createBlogMutation.isSuccess) {
      setTitle('');
      setContent('');
      setExcerpt('');
      setSelectedTags([]);
      setFeaturedImage('');
    }
  }, [createBlogMutation.isSuccess]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
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
            <Label htmlFor="featured-image">Featured Image</Label>
            <div className="space-y-4">
              {featuredImage && (
                <div className="relative">
                  <img 
                    src={featuredImage} 
                    alt="Featured" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    onClick={() => setFeaturedImage('')}
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </div>
                </Label>
                {uploadImageMutation.isPending && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="space-y-4">
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a new tag..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <Button type="button" onClick={handleAddTag} variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {availableTags && availableTags.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Available tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableTags
                      .filter(tag => !selectedTags.includes(tag.name))
                      .map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => handleTagSelect(tag.name)}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}
            </div>
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
