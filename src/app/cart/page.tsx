export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 py-10">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-neutral-950">
        장바구니
      </h1>
      <p className="mt-2 text-sm font-semibold text-neutral-600">
        장바구니 기능은 추후 연결 예정입니다. (미팅용 화면)
      </p>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
        <div className="text-sm font-extrabold text-neutral-950">
          담긴 상품이 없습니다.
        </div>
        <div className="mt-2 text-sm font-semibold text-neutral-600">
          상품을 둘러보고 장바구니에 담아보세요.
        </div>
      </div>
    </div>
  );
}
