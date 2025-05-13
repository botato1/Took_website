"use client";

import ProtectedRoute from "@/components/Protect/protectroute.jsx";

export default function ContactPage() {
  return (
    <ProtectedRoute>
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
              <div
                className="mb-12 rounded-xs bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                data-wow-delay=".15s"
              >
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  광고 문의하기
                </h2>
                <p className="mb-12 text-base font-medium text-body-color">
                  TOOK의 혁신적인 광고 서비스에 대한 문의를 남겨주시면 담당자가 이메일로 빠르게 답변드립니다.
                </p>
                <form>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          이름
                        </label>
                        <input
                          type="text"
                          placeholder="이름을 입력하세요"
                          className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="email"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          이메일
                        </label>
                        <input
                          type="email"
                          placeholder="이메일 주소를 입력하세요"
                          className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="message"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          문의 내용
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          placeholder="문의 내용을 입력하세요"
                          className="border-stroke w-full resize-none rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <button className="rounded-xs bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                        문의하기
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
              <div className="shadow-three dark:bg-gray-dark relative z-10 rounded-xs bg-white p-8 sm:p-11 lg:p-8 xl:p-11">
                <h3 className="mb-4 text-2xl leading-tight font-bold text-black dark:text-white">
                  광고 서비스 안내
                </h3>
                <p className="border-body-color/25 text-body-color mb-11 border-b pb-11 text-base leading-relaxed dark:border-white/25">
                  TOOK에서는 혁신적인 광고 서비스를 제공합니다:
                  <br /><br />
                  <strong>광고형 자판기</strong> 장소에 맞는 광고 노출
                  <br />
                  <strong>광고형 자판기</strong> 상품 지급으로 인한 인식 개선
                </p>
                <div>
                  <div className="mb-4 flex items-center">
                    <span className="bg-primary/10 mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md text-primary">
                      <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
                        <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
                      </svg>
                    </span>
                    <p className="text-body-color text-base font-medium">
                      맞춤형 광고 솔루션 제안
                    </p>
                  </div>
                  <div className="mb-4 flex items-center">
                    <span className="bg-primary/10 mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md text-primary">
                      <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
                        <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
                      </svg>
                    </span>
                    <p className="text-body-color text-base font-medium">
                      무료 상담 및 시연 가능
                    </p>
                  </div>
                  <div className="mb-4 flex items-center">
                    <span className="bg-primary/10 mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md text-primary">
                      <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
                        <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
                      </svg>
                    </span>
                    <p className="text-body-color text-base font-medium">
                      문의 후 24시간 내 답변
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}