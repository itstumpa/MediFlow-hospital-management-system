"use client";

interface ConsultationFeeProps {
  fee: number;
}

export function ConsultationFee({ fee }: ConsultationFeeProps) {
  return (
    <div className="text-center">
      <p className="text-[11px] font-medium uppercase tracking-wider text-text-secondary">
        Consultation
      </p>
      <p className="text-xl font-bold text-text-primary">
        ${fee}
        <span className="text-xs font-normal text-text-secondary">.00</span>
      </p>
    </div>
  );
}
