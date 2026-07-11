"use client";

import { Button } from "@/app/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTAButtons() {
  return (
    <div className="hidden items-center gap-3 md:flex">
      <Button variant="outline" size="sm" href="/auth/login">
        Login
      </Button>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Button
          variant="primary"
          size="sm"
          href="/appointment"
          className="group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
        >
          Book Appointment
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Button>
      </motion.div>
    </div>
  );
}
