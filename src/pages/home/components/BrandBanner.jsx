import Container from "@/common/Container";
import GlowDot from "@/common/GlowDot";
import { Archive, BadgeCheck, Database } from "lucide-react";

export default function BrandBanner() {
  // # Banner giới thiệu thương hiệu, dịch vụ

  const commitments = [
    {
      icon: BadgeCheck,
      title: "100% nguyên bản",
      description:
        "Cam kết từng đôi giày xuất xưởng mang đầy đủ tem kiểm định nguyên bản và mã chip xác thực.",
    },
    {
      icon: Database,
      title: "Dữ liệu đích thực",
      description:
        "Thông số kỹ thuật và số lượng tồn kho được cập nhật từ hệ thống sản phẩm.",
    },
    {
      icon: Archive,
      title: "Chuẩn sneakerhead",
      description:
        "Đóng gói bảo vệ kép chống móp hộp giày, phục vụ nhu cầu lưu trữ và sưu tầm.",
    },
  ];
  return (
    <section aria-labelledby="brand-title" className="py-6 sm:py-8">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-linear-to-br from-primary via-chart-3 to-chart-4 p-6 text-white shadow-xl shadow-primary/15 sm:p-8 lg:p-12">
          <span className="inline-flex items-center gap-2 rounded-full  border border-white/30 bg-white/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wide">
            <GlowDot className="size-1.5 bg-white/60 shadow-white/30" />
            Cam kết chất lượng tiên phong
          </span>

          <h2
            id="brand-title"
            className="mt-5 maw-w-4xl font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl"
          >
            AUTHENTIC STREET CULTURE • ZERO COMPROMISE
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/90 sm:text-base">
            Chúng tôi xóa bỏ mọi rủi ro hàng giả bằng quy trình giám định độc
            lập khắt khe, mang lại giá trị thực thụ cho từng sản phẩm văn hóa
            đường phố.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3 lg:mt-10">
            {commitments.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/30 bg-white/10 p-5 transition-colors duration-300 hover:bg-white/15 lg:p-6"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/15">
                    <Icon
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.8}
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-2xl uppercase leading-tight">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-white/90">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
