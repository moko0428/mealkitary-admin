export default function Nav() {
  return (
    <div className="fixed bg-white flex justify-between px-5 sm:px-14 xl:px-20 w-full h-14 border items-center">
      <div className="text-xl text-blue-600 font-bold">mealkitary</div>
      <ul className="flex space-x-10">
        <li className="text-blue-600 text-base font-bold">Home</li>
        <li className="text-base">Product</li>
      </ul>
      <button className="bg-blue-600 text-white px-3 rounded">로그인</button>
    </div>
  );
}
