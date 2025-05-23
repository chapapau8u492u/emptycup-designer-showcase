
import { useState, useEffect } from 'react';
import { Heart, Phone, Info, MoreVertical, Grid3X3, Image, MapPin, Bookmark, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Designer {
  id: number;
  name: string;
  rating: number;
  description: string;
  projects: number;
  years: number;
  priceRange: string;
  phone: string;
  phone2?: string;
  isShortlisted: boolean;
}

const Index = () => {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [showShortlisted, setShowShortlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('bookmark');

  useEffect(() => {
    // Mock data - in a real app this would come from an API
    const mockDesigners: Designer[] = [
      {
        id: 1,
        name: "Epic Designs",
        rating: 4,
        description: "Passionate team of 4 designers working out of Bangalore with an experience of 4 years.",
        projects: 57,
        years: 8,
        priceRange: "$$",
        phone: "+91 - 984532853",
        phone2: "+91 - 984532854",
        isShortlisted: false
      },
      {
        id: 2,
        name: "Studio - D3",
        rating: 4.5,
        description: "Passionate team of 4 designers working out of Bangalore with an experience of 4 years.",
        projects: 43,
        years: 6,
        priceRange: "$$$",
        phone: "+91 - 984532853",
        phone2: "+91 - 984532854",
        isShortlisted: false
      },
      {
        id: 3,
        name: "House of designs",
        rating: 5,
        description: "Creative studio specializing in modern interior solutions with premium materials.",
        projects: 89,
        years: 12,
        priceRange: "$$$$",
        phone: "+91 - 984532853",
        isShortlisted: false
      }
    ];
    setDesigners(mockDesigners);
  }, []);

  const toggleShortlist = (id: number) => {
    setDesigners(prev => 
      prev.map(designer => 
        designer.id === id 
          ? { ...designer, isShortlisted: !designer.isShortlisted }
          : designer
      )
    );
  };

  const filteredDesigners = showShortlisted 
    ? designers.filter(d => d.isShortlisted)
    : designers;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`text-lg ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">EmptyCup</h1>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setActiveTab('bookmark')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === 'bookmark' ? 'text-orange-500 bg-orange-50' : 'text-gray-500'
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span className="text-xs font-medium">Bookmark</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 p-2 text-gray-500">
              <Image className="w-5 h-5" />
              <span className="text-xs font-medium">Gallery</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 p-2 text-gray-500">
              <MapPin className="w-5 h-5" />
              <span className="text-xs font-medium">Map</span>
            </button>
            
            <button 
              onClick={() => setShowShortlisted(!showShortlisted)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                showShortlisted ? 'text-orange-500 bg-orange-50' : 'text-gray-500'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="text-xs font-medium">Shortlisted</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 p-2 text-gray-500">
              <Grid3X3 className="w-5 h-5" />
              <span className="text-xs font-medium">Sort</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Designer Listings */}
      <main className="max-w-md mx-auto p-4 space-y-4">
        {filteredDesigners.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No shortlisted designers yet</p>
            <button 
              onClick={() => setShowShortlisted(false)}
              className="text-orange-500 text-sm mt-2 underline"
            >
              View all designers
            </button>
          </div>
        ) : (
          filteredDesigners.map((designer) => (
            <div key={designer.id} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{designer.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-orange-500 hover:text-orange-600"
                    >
                      Details →
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(designer.rating)}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {designer.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{designer.projects}</div>
                  <div className="text-xs text-gray-500">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{designer.years}</div>
                  <div className="text-xs text-gray-500">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{designer.priceRange}</div>
                  <div className="text-xs text-gray-500">Price</div>
                </div>
              </div>

              {/* Contact & Actions */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">{designer.phone}</div>
                  {designer.phone2 && (
                    <div className="text-sm font-medium text-gray-900">{designer.phone2}</div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleShortlist(designer.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      designer.isShortlisted 
                        ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${designer.isShortlisted ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg"
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Index;
