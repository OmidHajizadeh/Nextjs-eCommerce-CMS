type HeadingProps = {
  title: string;
  description: string;
};

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <article className="mb-4">
      <h1 className="font-extra-bold text-4xl mb-4">{title}</h1>
      <p className="font-regular text-gray-800">{description}</p>
    </article>
  );
};

export default Heading;
