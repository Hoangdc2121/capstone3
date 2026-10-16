import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import AppButton from "@/common/AppButton";
import Container from "@/common/Container";
import ProductSearchContent from "./ProductSearchContent";

export default function HeaderSearch({ open, onClose }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.section
          key="header-search"
          id="header-search-panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: {
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: 0.25,
            },
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              onClose();
            }
          }}
          className="absolute inset-x-0 top-full overflow-hidden bg-surface shadow-lg"
        >
          <div className="border-y border-border">
            <Container>
              <div className="max-h-[75vh] overflow-y-auto py-5 sm:py-6">
                <div className="mb-3 flex justify-end">
                  <AppButton
                    type="text"
                    htmlType="button"
                    aria-label="Đóng tìm kiếm"
                    className="drawer-close-button size-9! p-0!"
                    onClick={onClose}
                    icon={
                      <X
                        aria-hidden="true"
                        className="drawer-close-icon size-5"
                      />
                    }
                  />
                </div>

                <ProductSearchContent open={open} onClose={onClose} autoFocus />
              </div>
            </Container>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
