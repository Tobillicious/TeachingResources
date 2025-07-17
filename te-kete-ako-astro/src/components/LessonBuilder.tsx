import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

// Define types for our data
interface Resource {
  id: string;
  collection: 'lessons' | 'handouts';
  slug: string;
  data: {
    title: string;
    description: string;
    tags?: string[];
  };
}

interface LessonPlanItem extends Resource {}

interface LessonBuilderProps {
  resources: Resource[];
}

const LessonBuilder: React.FC<LessonBuilderProps> = ({ resources }) => {
  const [selectedResources, setSelectedResources] = useState<LessonPlanItem[]>([]);
  const [notes, setNotes] = useState('');
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load saved plan from local storage on initial render
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('lessonPlan');
      if (savedPlan) {
        const { resources, notes } = JSON.parse(savedPlan);
        setSelectedResources(resources || []);
        setNotes(notes || '');
      }
    } catch (error) {
      console.error("Failed to parse lesson plan from local storage", error);
      setSelectedResources([]);
      setNotes('');
    }
  }, []);

  // Save plan to local storage whenever it changes
  useEffect(() => {
    const plan = { resources: selectedResources, notes };
    localStorage.setItem('lessonPlan', JSON.stringify(plan));
  }, [selectedResources, notes]);

  const addResourceToPlan = (resource: Resource) => {
    if (!selectedResources.find(item => item.id === resource.id)) {
      setSelectedResources([...selectedResources, resource]);
    }
  };

  const removeResourceFromPlan = (resourceId: string) => {
    setSelectedResources(selectedResources.filter(item => item.id !== resourceId));
  };

  const handlePrint = () => {
    window.print();
  };

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSelectedResources((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Resource Selection Column (will be hidden on print) */}
      <div className="lg:col-span-2 no-print">
        <h2 className="text-2xl font-bold mb-4">Available Resources</h2>
        <div className="border p-4 rounded-lg bg-gray-50 min-h-[400px] max-h-[600px] overflow-y-auto">
          <ul>
            {resources.map(resource => (
              <li key={resource.id} className="mb-2 p-2 border rounded flex justify-between items-center bg-white">
                <div>
                  <h3 className="font-bold">{resource.data.title}</h3>
                  <p className="text-sm text-gray-600">{resource.data.description}</p>
                </div>
                <button
                  onClick={() => addResourceToPlan(resource)}
                  className="bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-700 transition-colors flex-shrink-0 ml-4"
                >
                  + Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Lesson Plan Preview Column (the printable area) */}
      <div className="printable-content">
        <h2 className="text-2xl font-bold mb-4">Your Lesson Plan</h2>
        <div className="border p-4 rounded-lg bg-white min-h-[400px]">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={selectedResources} strategy={verticalListSortingStrategy}>
              {selectedResources.map(item => (
                <SortableItem key={item.id} id={item.id}>
                  <div className="flex justify-between items-center">
                    <a href={`/${item.collection}/${item.slug}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {item.data.title}
                    </a>
                    <button
                      onClick={() => removeResourceFromPlan(item.id)}
                      className="text-red-500 font-bold ml-4"
                    >
                      &times;
                    </button>
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Teacher's Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your own notes, instructions, or reflections here..."
              className="w-full p-2 border-2 border-gray-200 rounded-lg h-40"
            ></textarea>
          </div>
        </div>
        <button 
          onClick={handlePrint}
          className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors no-print"
        >
          Print Lesson Plan
        </button>
      </div>
    </div>
  );
};

export default LessonBuilder;
