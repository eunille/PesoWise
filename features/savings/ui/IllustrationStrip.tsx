import Image from 'next/image';

export const IllustrationStrip = () => {
  return (
    <section className="w-full overflow-hidden">
      <div className="relative w-full">
        <Image
          src="/images/gov.svg"
          alt="Illustration"
          width={1400}
          height={600}
          className="w-full h-auto"
          sizes="100vw"
          priority={false}
        />
      </div>
    </section>
  );
};
