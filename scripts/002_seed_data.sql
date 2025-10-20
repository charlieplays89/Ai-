-- Insert sample profile (will be replaced by real auth users)
-- This is just for development/testing

-- Insert sample team
INSERT INTO public.teams (id, name, description, created_by)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Personal Workspace', 'Your personal workspace', NULL)
ON CONFLICT DO NOTHING;

-- Insert sample models
INSERT INTO public.models (id, team_id, name, description, provider, model_type, base_model, status, version)
VALUES
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'GPT-4 Custom', 'Fine-tuned GPT-4 for customer support', 'OpenAI', 'text', 'gpt-4', 'active', '1.2.0'),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'Claude Sonnet Custom', 'Specialized for code review', 'Anthropic', 'text', 'claude-sonnet-4', 'active', '1.0.0'),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'Llama 3.1 Fine-tuned', 'Custom trained on internal docs', 'Meta', 'text', 'llama-3.1-70b', 'deploying', '1.0.0')
ON CONFLICT DO NOTHING;

-- Insert sample datasets
INSERT INTO public.datasets (id, team_id, name, description, type, size_bytes, row_count, tags)
VALUES
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'Customer Support Conversations', 'Historical support chat logs', 'text', 524288000, 50000, ARRAY['support', 'chat', 'customer-service']),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'Code Review Dataset', 'Pull request reviews and comments', 'text', 104857600, 10000, ARRAY['code', 'review', 'programming']),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'Product Images', 'E-commerce product photos', 'image', 2147483648, 25000, ARRAY['images', 'products', 'ecommerce'])
ON CONFLICT DO NOTHING;

-- Insert sample prompts
INSERT INTO public.prompts (id, team_id, name, content, category, tags, usage_count, avg_quality_score)
VALUES
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'Customer Support Response', 'You are a helpful customer support agent. Respond to the following inquiry with empathy and provide clear solutions: {inquiry}', 'Support', ARRAY['support', 'customer-service'], 245, 4.5),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'Code Review Assistant', 'Review the following code for best practices, potential bugs, and suggest improvements: {code}', 'Development', ARRAY['code', 'review'], 189, 4.7),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'Content Summarizer', 'Summarize the following content in 3-5 bullet points, focusing on key takeaways: {content}', 'Content', ARRAY['summary', 'content'], 312, 4.3)
ON CONFLICT DO NOTHING;
