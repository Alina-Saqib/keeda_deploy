'use client';

import { useState } from 'react';
import {
  AddOutletSchema,
  addOutletSchema,
} from '@/utils/validators/add-outlet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { addOutlet } from '@/api-handler/api';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Controller } from 'react-hook-form';
import Select from '@/components/ui/select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {
  daysOfWeek,
  selectTime,
  countries,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
const initialValues = {
  name: '',
  pictureurl: 'dddd',
  country: '',
  address: '',
};

export default function AddOutletForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const router = useRouter();
  const [reset, setReset] = useState({});
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<
    Record<string, [string, string]>
  >({});

  const handleDaySelection = (day: string) => {
    if (!selectedDays.includes(day)) {
      setSelectedDays([...selectedDays, day]);
      setSelectedTimes((prev) => ({ ...prev, [day]: ['', ''] }));
    }
  };

  const handleRemoveDay = (day: string) => {
    const updatedDays = selectedDays.filter(
      (selectedDay) => selectedDay !== day
    );
    setSelectedDays(updatedDays);
    setSelectedTimes((prev) => {
      const { [day]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleTimeChange = (
    day: string,
    type: 'open' | 'close',
    time: string
  ) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [day]: type === 'open' ? [time, prev[day][1]] : [prev[day][0], time],
    }));
  };

  const renderDaySelections = () => {
    return (
      <>
        {selectedDays.map((day: any, index: any) => (
          <div key={index} className="ml-3 flex items-center space-x-16">
            <span>{day}</span>
            <Select
              options={selectTime}
              value={selectedTimes[day][0]}
              onChange={(value: any) => handleTimeChange(day, 'open', value)}
              className="w-40"
            />
            <Select
              options={selectTime}
              value={selectedTimes[day][1]}
              onChange={(value: any) => handleTimeChange(day, 'close', value)}
              className="w-40"
            />
            <button
              onClick={() => handleRemoveDay(day)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </>
    );
  };

  const onSubmit: SubmitHandler<AddOutletSchema> = async (data) => {
    try {
      setIsLoading(true);
      const { name, address, country } = data;

      const formData = {
        name,
        pictureurl: 'uuu',
        daysOfWeek: selectedTimes,
        outletAddress: address,
        country: country,
      };

      const response = await addOutlet(formData);
      toast.success('Outlet created successfully!', {
        duration: 2000,
      });
      const outletId = response?.data?.outletId;
      localStorage.setItem('outletId', outletId);
      router.push('/business-info/add-menu');
      setIsLoading(false);
    } catch (error) {
      console.error('Outlet creation failed:', error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form<AddOutletSchema>
        validationSchema={addOutletSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ control, register, formState: { errors } }) => (
          <div className="mt-4 space-y-5">
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              placeholder="Enter your business name"
              color="info"
              rounded="pill"
              className="[&>label>span]:font-medium"
              {...register('name')}
              error={errors.name?.message}
            />
            <Controller
              name="country"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={countries}
                  value={value}
                  onChange={onChange}
                  rounded="pill"
                  getOptionValue={(option) => option.name}
                  //isSearchable
                  placeholder="Select country"
                />
              )}
            />

            <TextareaAutosize
              minRows={3}
              placeholder="Enter address"
              {...register('address')}
              style={{
                width: '100%',
                color: 'black',
                borderRadius: '18px',
                overflow: 'auto',
              }}
            />

            {renderDaySelections()}
            <Controller
              name="dayOfWeek"
              control={control}
              render={({ field: { value } }) => (
                <Select
                  options={daysOfWeek}
                  value={value}
                  rounded="pill"
                  onChange={handleDaySelection}
                  getOptionValue={(option) => option.name}
                  placeholder="Select work days"
                />
              )}
            />

            <Button
              className="w-full border-2 border-primary-light text-base font-medium"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
              disabled={loading}
            >
              {loading ? (
                <div
                  style={{
                    display: 'inline-block',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #3498db',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px',
                  }}
                />
              ) : (
                'Create Outlet'
              )}
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
