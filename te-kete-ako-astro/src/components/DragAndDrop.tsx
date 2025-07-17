import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

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

const DragAndDrop: React.FC<DragAndDropProps> = ({ items: initialItems, categories }) => {
  const [items, setItems] = useState(initialItems);
  const [containers, setContainers] = useState(
    categories.map(c => ({
      id: c.id,
      title: c.title,
      items: [] as number[]
    }))
  );
  const [unrankedItems, setUnrankedItems] = useState(initialItems.map(i => i.id));
  const [score, setScore] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findContainer(id) {
    if (id === 'unranked') {
      return { id: 'unranked', items: unrankedItems };
    }
    return containers.find(c => c.id === id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over) {
      const activeContainer = findContainer(active.data.current.sortable.containerId);
      const overContainer = findContainer(over.id);

      if (activeContainer && overContainer && activeContainer !== overContainer) {
        const activeItems = activeContainer.id === 'unranked' ? unrankedItems : activeContainer.items;
        const overItems = overContainer.items;
        const activeIndex = activeItems.indexOf(active.id);
        
        const newActiveItems = [...activeItems];
        newActiveItems.splice(activeIndex, 1);

        const newOverItems = [...overItems, active.id];

        if (activeContainer.id === 'unranked') {
          setUnrankedItems(newActiveItems);
        } else {
          setContainers(containers.map(c => c.id === activeContainer.id ? { ...c, items: newActiveItems } : c));
        }

        setContainers(containers.map(c => c.id === overContainer.id ? { ...c, items: newOverItems } : c));

        // Check if the drop was correct
        const droppedItem = items.find(i => i.id === active.id);
        if (droppedItem && droppedItem.category === over.id) {
          setScore(s => s + 1);
        }
      }
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-8">
        <div className="w-1/3 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Items to Sort</h3>
          <SortableContext items={unrankedItems} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {unrankedItems.map(id => {
                const item = items.find(i => i.id === id);
                return <SortableItem key={id} id={id}>{item.text}</SortableItem>;
              })}
            </div>
          </SortableContext>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
          {containers.map(({ id, title, items: itemIds }) => (
            <div key={id} className="p-4 bg-blue-100 rounded-lg min-h-[200px]">
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {itemIds.map(itemId => {
                    const item = items.find(i => i.id === itemId);
                    return <SortableItem key={itemId} id={itemId}>{item.text}</SortableItem>;
                  })}
                </div>
              </SortableContext>
            </div>
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
