import React from "react";
import { PackageIcon, RefrigeratorIcon, SnowflakeIcon, BoxIcon } from "lucide-react";
import { storageTypes } from "../../data/catalog";
import { StorageOption, StorageType } from "../../types/marketplace";
import { formatMoney } from "../../utils/format";
const icons: Record<StorageType, BoxIcon> = {
  dry: PackageIcon,
  cold: RefrigeratorIcon,
  frozen: SnowflakeIcon
};
export function StorageTable({
  storage


}: {storage: StorageOption[];}) {
  if (storage.length === 0) {
    return <p className="text-sm text-steel-500">This kitchen doesn’t offer storage add-ons.</p>;
  }
  return <div className="overflow-hidden rounded-xl border border-steel-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-steel-50 text-xs uppercase tracking-wider text-steel-500">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Type</th>
            <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">Capacity</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">Monthly add-on</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-steel-200">
          {storage.map((s) => {
          const meta = storageTypes.find((t) => t.key === s.type);
          const Icon = icons[s.type];
          return <tr key={s.type} className="transition-colors hover:bg-steel-50">
                <td className="px-4 py-3.5">
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-steel-100 text-steel-700">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-medium text-steel-900">{meta?.label}</span>
                      <span className="block text-xs text-steel-500 sm:hidden">{s.capacity}</span>
                      <span className="hidden text-xs text-steel-500 sm:block">{meta?.description}</span>
                    </span>
                  </span>
                </td>
                <td className="hidden px-4 py-3.5 text-steel-700 sm:table-cell">{s.capacity}</td>
                <td className="px-4 py-3.5 text-right font-semibold text-steel-900">{formatMoney(s.monthlyPrice)}<span className="font-normal text-steel-500">/mo</span></td>
              </tr>;
        })}
        </tbody>
      </table>
    </div>;
}