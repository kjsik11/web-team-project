import sharp from 'sharp';
import sha256 from 'sha256';
import { v4 as uuidv4 } from 'uuid';
import { uploadS3 } from '@utils/aws';

const handleMarkdownImage: (options: {
  input: Buffer;
  basePath?: string;
}) => Promise<{
  url: string;
}> = async ({ input, basePath = '' }) => {
  const filename = sha256(uuidv4());

  const original = sharp(input)
    .clone()
    .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .resize({
      fit: 'contain',
      width: 500,
      withoutEnlargement: true,
    })
    .jpeg({ quality: 40, chromaSubsampling: '4:4:4' })
    .withMetadata();

  await uploadS3({
    buffer: await original.toBuffer(),
    key: `${basePath}${filename}`,
  });
  return {
    url: `${process.env.CLOUDFRONT_URL}/${basePath}${filename}`,
  };
};

export default handleMarkdownImage;
