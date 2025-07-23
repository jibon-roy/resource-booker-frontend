"use client";
import heroBg from "@/assets/images/herobg.png";
import BookingForm from "./BookingForm";
import { Button } from "@/components/ui/buttons/button/Button";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/ui-library/container";
import Link from "next/link";
import CountUp from "react-countup";

const Banner = () => {
  return (
    <section
      className="bg-cover relative py-12 lg:py-20 overflow-hidden bg-center min-h-[652px]"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >
      <div className="">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <Container className="relative mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Smart Resource
                  <span className="text-blue-600"> Booking</span>
                  <br />
                  Made Simple
                </h1>
                <p className="text-xl max-w-2xl text-gray-600 leading-relaxed">
                  Eliminate booking conflicts with our intelligent scheduling
                  system. Built-in buffer time and real-time availability
                  checking ensures smooth operations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/calendar">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 bg-transparent"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Calendar view
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-blue-100">
                <div className="max-md:text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    <CountUp end={99.9} decimals={1} duration={2} />%
                  </div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>

                <div className="max-md:text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    <CountUp end={10000} separator="," duration={2.5} />+
                  </div>
                  <div className="text-sm text-gray-600">Bookings</div>
                </div>

                <div className="max-md:text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    <CountUp end={500} separator="," duration={2} />+
                  </div>
                  <div className="text-sm text-gray-600">Companies</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <BookingForm />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Banner;
