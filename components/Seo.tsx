import { NextSeo } from "next-seo";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

const Seo: React.FC<SeoProps> = ({ title, description, image, url }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        url,
        images: [
          {
            url: image as string,
          },
        ],
      }}
    />
  );
};

export default Seo;
