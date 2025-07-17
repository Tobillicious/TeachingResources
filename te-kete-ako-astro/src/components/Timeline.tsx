import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

interface TimelineEvent {
  id: number;
  year: number;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const [items, setItems] = useState(() => events.sort(() => Math.random() - 0.5));
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      setIsCorrect(null);
    }
  }

  const checkOrder = () => {
    const sortedCorrectly = items.every((item, index) => item.year === [...events].sort((a, b) => a.year - b.year)[index].year);
    setIsCorrect(sortedCorrectly);
  };

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {items.map(item => (
              <SortableItem key={item.id} id={item.id}>
                <div className="flex items-center">
                  <span className="font-bold text-lg mr-4">{item.year}</span>
                  <span>{item.description}</span>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="mt-6 text-center">
        <button onClick={checkOrder} className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
          Check Order
        </button>
        {isCorrect === true && <p className="text-green-600 font-bold mt-4">Correct! Well done.</p>}
        {isCorrect === false && <p className="text-red-600 font-bold mt-4">Not quite right. Try again!</p>}
      </div>
    </div>
  );
};

export default Timeline;
