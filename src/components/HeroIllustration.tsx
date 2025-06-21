import Hero from '../../public/Hero.svg'
const HeroIllustration = () => {
  return (
    <div className="w-full max-w-md mx-auto relative">
      <img
        src={Hero}
        alt="Hero Illustration"
        className="w-full h-auto drop-shadow-2xl"
        style={{ animation: 'fadeIn 1s ease-in-out' }}
      />
    </div>
  );
};

export default HeroIllustration;
