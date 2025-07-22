import { Award, Clock, Globe, Shield, Users, Zap } from "lucide-react";
import { JSX } from "react";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: "Conflict Detection",
    description:
      "Advanced algorithm prevents overlapping bookings with intelligent buffer time management",
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    title: "Buffer Time",
    description:
      "Automatic 10-minute buffer before and after bookings to prevent back-to-back conflicts",
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "Real-time Updates",
    description:
      "Instant availability updates and notifications keep everyone in sync",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Multi-Resource",
    description:
      "Manage multiple resources from rooms to equipment with unified dashboard",
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    title: "Calendar Integration",
    description:
      "Seamlessly sync with Google Calendar, Outlook, and other popular calendar apps",
  },
  {
    icon: <Award className="w-6 h-6 text-blue-600" />,
    title: "Analytics",
    description:
      "Detailed usage analytics and reporting to optimize resource allocation",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Seamless Booking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent booking system prevents conflicts and optimizes
            resource utilization
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-blue-100 rounded-xl p-6 bg-white 
                        shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>

              {/* Title */}
              <p className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </p>

              {/* Description */}
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
