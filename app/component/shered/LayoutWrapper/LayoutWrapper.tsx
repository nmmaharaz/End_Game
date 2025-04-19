import { ReactNode } from "react"
export default function LayoutWrapper({ children }: { children: ReactNode }) {

    return (
        <>
            <div className="bg-slate-950 min-h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
                {children}
            </div>
        </>
    )
}
