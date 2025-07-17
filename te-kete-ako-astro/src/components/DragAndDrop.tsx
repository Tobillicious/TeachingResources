import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, useDroppable, useDraggable } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface Item {
  id: number;
  text: string;
  category: string;
}

interface Category {
  id: string;
  title: string;
}

interface DragAndDropProps {
  items: Item[];
  categories: Category[];
}

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : {};
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="p-2 bg-white rounded shadow-md cursor-grab">
      {children}
    </div>
  );
};

const DroppableCategory = ({ id, title, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    backgroundColor: isOver ? '#cceeff' : '#f0f8ff',
  };
  return (
    <div ref={setNodeRef} style={style} className="p-4 rounded-lg min-h-[200px]">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

const DragAndDrop: React.FC<DragAndDropProps> = ({ items: initialItems, categories }) => {
  const [items, setItems] = useState<{ [key: string]: Item[] }>({
    unranked: initialItems,
    ...Object.fromEntries(categories.map(c => [c.id, []]))
  });
  const [score, setScore] = useState(0);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (over) {
      const activeContainer = Object.keys(items).find(key => items[key].some(item => item.id === active.id));
      const overContainer = over.id;

      if (activeContainer && overContainer && activeContainer !== overContainer) {
        const activeItems = items[activeContainer];
        const overItems = items[overContainer];
        const activeIndex = activeItems.findIndex(item => item.id === active.id);
        const [movedItem] = activeItems.splice(activeIndex, 1);

        setItems(prev => ({
          ...prev,
          [activeContainer]: activeItems,
          [overContainer]: [...overItems, movedItem]
        }));

        if (movedItem.category === overContainer) {
          setScore(s => s + 1);
        }
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-8">
        <div className="w-1/3 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Items to Sort</h3>
          <div className="space-y-2">
            {items.unranked.map(item => (
              <DraggableItem key={item.id} id={item.id}>
                {item.text}
              </DraggableItem>
            ))}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
          {categories.map(({ id, title }) => (
            <DroppableCategory key={id} id={id} title={title}>
              {items[id].map(item => (
                <div key={item.id} className="p-2 bg-white rounded shadow-md">
                  {item.text}
                </div>
              ))}
            </DroppableCategory>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-2xl font-bold">Score: {score}</p>
      </div>
    </DndContext>
  );
};

export default DragAndDrop;

