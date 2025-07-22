interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "1",
    title: "Select Resource",
    description:
      "Choose from available rooms, equipment, or facilities from our comprehensive list",
  },
  {
    number: "2",
    title: "Pick Time Slot",
    description:
      "Select your preferred time with real-time availability checking and conflict prevention",
  },
  {
    number: "3",
    title: "Confirm Booking",
    description:
      "Get instant confirmation with calendar integration and automated reminders",
  },
];

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, smart, and secure booking in three easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-xl shadow-sm hover:shadow-lg 
                         p-6 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
