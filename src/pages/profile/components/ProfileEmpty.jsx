import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AppButton from "@/common/AppButton";

export default function ProfileEmpty({ icon: Icon, title, description }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center px-4 py-16 text-center sm:py-20">
      {Icon && (
        <span className="flex size-18 items-center justify-center rounded-2xl border border-border bg-secondary text-muted-foreground">
          <Icon aria-hidden="true" className="size-8" strokeWidth={1.7} />
        </span>
      )}

      <h3 className="mt-5 font-heading text-2xl uppercase text-foreground sm:text-3xl">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <AppButton
        className="mt-7 normal-case!"
        onClick={() => navigate("/shop")}
      >
        Khám phá sản phẩm
        <ArrowRight aria-hidden="true" className="size-4" />
      </AppButton>
    </div>
  );
}
