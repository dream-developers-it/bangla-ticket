import { FaTicketAlt, FaUserCheck, FaTrophy } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaTicketAlt className="w-12 h-12" />,
      title: "Buy Ticket",
      description: "Choose your lucky numbers and purchase your ticket securely"
    },
    {
      icon: <FaUserCheck className="w-12 h-12" />,
      title: "Get Confirmation",
      description: "Receive instant confirmation and ticket details via SMS"
    },
    {
      icon: <FaTrophy className="w-12 h-12" />,
      title: "Win Prizes",
      description: "Watch the draw live and claim your prizes instantly"
    }
  ];

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center text-white">
            <div className="bg-white/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-white/80">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks; 