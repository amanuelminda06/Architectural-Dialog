import Link from "next/link";

const PROFILE_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCBEUwyFKQY3sVWWfE3mOvbgCrJ0ld8DL_MxMYRV8I0U32CpiuyZ9YgCqthRSRuCgRFfpu_4Po3NmpRd09E8VFHpIlcjp6IpHytePKr9M7zwTK5PXjd9vBpn_RSb8qR1XOKv0h24gsHQGRMosYd5-TXO02F0bcHtxHfpYrrHR85_r0gVulyktlhEwLWnuN3-NUSYPbdRCXxNySzLRFN-BMF6Cr0d66oUVvASzkGF2CeFVdlP4vo3t7J";

export function Masthead() {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-20 px-margin flex items-center justify-between gap-space-sm">
        <div className="flex items-center min-w-[44px] min-h-[44px] justify-start">
          <span className="font-meta-mono text-meta-mono uppercase text-secondary tracking-widest">
            Vol. IV
          </span>
        </div>
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-center flex-1"
        >
          <span className="font-headline-md text-subhead tracking-tight text-on-surface italic font-normal leading-none">
            Architecture Dialogue
          </span>
          <span className="font-meta-mono text-meta-mono uppercase text-secondary tracking-wider mt-space-xs">
            Autumn • Index / Feed
          </span>
        </Link>
        <div className="flex items-center justify-end min-w-[44px] min-h-[44px]">
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
            src={PROFILE_AVATAR}
          />
        </div>
      </div>
    </header>
  );
}