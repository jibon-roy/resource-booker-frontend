import { CheckCircle, Star } from "lucide-react";
import React from "react";

const BenifitSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Resource Booker?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Zero Double Bookings
                  </h3>
                  <p className="text-gray-600">
                    Our intelligent conflict detection ensures no overlapping
                    reservations
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Automated Buffer Management
                  </h3>
                  <p className="text-gray-600">
                    Built-in buffer time prevents back-to-back booking conflicts
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Real-time Availability
                  </h3>
                  <p className="text-gray-600">
                    See what&apos;s available instantly with live updates across
                    all devices
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Easy Integration
                  </h3>
                  <p className="text-gray-600">
                    Works seamlessly with your existing calendar and workflow
                    systems
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Trusted by Teams Worldwide
              </h3>
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600">4.9/5 from 2,000+ reviews</p>
            </div>

            <div className="space-y-4">
              <blockquote className="text-gray-700 italic">
                &quot;Resource Booker eliminated our double-booking headaches
                completely. The buffer time feature is genius!&quot;
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">JD</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Jane Doe</div>
                  <div className="text-sm text-gray-600">
                    Operations Manager, TechCorp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenifitSection;
