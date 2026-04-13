import { useState } from "react";
import CustomerNavbar from "../../components/layout/CustomerNavbar";
import ShopCard from "../../components/customer/ShopCard";
import InputField from "../../components/ui/InputField";
import EmptyState from "../../components/ui/EmptyState";
import Toggle from "../../components/ui/Toggle";
import Button from "../../components/ui/Button";

const categories = ["All", "Grocery", "Bakery", "Dairy", "Snacks"];

const ShopBrowsePage = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [onlyOpen, setOnlyOpen] = useState(false);
    const [onlyVeg, setOnlyVeg] = useState(false);

    // dummy data
    const shops = [
        {
            id: "1",
            name: "Fresh Basket",
            category: "Grocery",
            rating: 4.5,
            isOpen: true,
            isVeg: true,
            deliveryTime: "30–40 min",
        },
        {
            id: "2",
            name: "Daily Dairy",
            category: "Dairy",
            rating: 4.2,
            isOpen: false,
            isVeg: true,
            deliveryTime: "20–30 min",
        },
        {
            id: "3",
            name: "Daily Dairy",
            category: "Dairy",
            rating: 4.2,
            isOpen: false,
            isVeg: true,
            deliveryTime: "20–30 min",
        },
        {
            id: "4",
            name: "Daily Dairy",
            category: "Dairy",
            rating: 4.2,
            isOpen: false,
            isVeg: true,
            deliveryTime: "20–30 min",
        },
        {
            id: "5",
            name: "Daily Dairy",
            category: "Dairy",
            rating: 4.2,
            isOpen: false,
            isVeg: true,
            deliveryTime: "20–30 min",
        },
        {
            id: "6",
            name: "Daily Dairy",
            category: "Dairy",
            rating: 4.2,
            isOpen: false,
            isVeg: true,
            deliveryTime: "20–30 min",
        },
    ];

    const filtered = shops.filter((shop) => {
        return (
            shop.name.toLowerCase().includes(search.toLowerCase()) &&
            (selectedCategory === "All" ||
                shop.category === selectedCategory) &&
            (!onlyOpen || shop.isOpen) &&
            (!onlyVeg || shop.isVeg)
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-32 md:pt-14">
            {/* 🔥 HEADER */}
            <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-4 md:hidden">
                <h1 className="text-lg font-semibold">Browse Shops</h1>
            </header>

            {/* 🔥 CONTENT */}
            <div className="max-w-5xl mx-auto px-4 mt-4 space-y-4">
                {/* 🔍 SEARCH */}
                <InputField
                    label="Search shops"
                    placeholder="Search by shop name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* 🏷️ CATEGORIES */}
                <div className="flex gap-2 overflow-x-auto p-1 snap-x snap-start">
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat;

                        return (
                            <Button
                                key={cat}
                                size="sm"
                                variant={isActive ? "primary" : "outline"}
                                onClick={() => setSelectedCategory(cat)}
                                className={`
          rounded-full whitespace-nowrap px-4 py-1.5 text-xs
          ${isActive ? "shadow-sm" : "border-gray-200 text-gray-600 hover:bg-gray-100"}
        `}
                            >
                                {cat}
                            </Button>
                        );
                    })}
                </div>

                {/* 🔧 FILTERS */}
                <div className="flex flex-wrap gap-4 items-center bg-white p-3 rounded-xl border border-gray-100">
                    <Toggle
                        checked={onlyOpen}
                        onChange={setOnlyOpen}
                        label="Open now"
                    />
                    <Toggle
                        checked={onlyVeg}
                        onChange={setOnlyVeg}
                        label="Veg only"
                    />
                </div>

                {/* 🏪 SHOP LIST */}
                {filtered.length === 0 ? (
                    <EmptyState
                        icon="🏪"
                        title="No shops found"
                        description="Try adjusting filters or search"
                    />
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((shop) => (
                            <ShopCard key={shop.id} shop={shop} />
                        ))}
                    </div>
                )}
            </div>

            <CustomerNavbar />
        </div>
    );
};

export default ShopBrowsePage;
