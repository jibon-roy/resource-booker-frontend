import { Button } from "@/components/ui/buttons/button/Button";
import Link from "next/link";
import React from "react";

const CTASection = () => {
  return (
    <div>
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Streamline Your Bookings?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teams who trust Resource Booker for conflict-free
            resource management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-3 bg-transparent"
              >
                Schedule Demo
              </Button>
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default CTASection;
