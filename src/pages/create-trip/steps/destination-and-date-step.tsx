import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from 'date-fns'
import "react-day-picker/dist/style.css";

interface destinateAndDateStepProps {
    isGuestInputOpen: boolean
    closeGuestsInput: () => void
    openGuestsInput: () => void
    setDestination: (destination: string) => void
    setEventStartAndEndDate: (dates: DateRange | undefined) => void
    eventStartAndEndDate: DateRange | undefined


}

export function DestinationAndDateStep(
    {
        isGuestInputOpen,
        closeGuestsInput,
        openGuestsInput,
        setDestination,
        setEventStartAndEndDate,
        eventStartAndEndDate
    }
        : destinateAndDateStepProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)


    function openDatePicker() {
        return setIsDatePickerOpen(true)
    }

    function closeDatePicker() {
        return setIsDatePickerOpen(false)
    }

    const displayedDate = eventStartAndEndDate && eventStartAndEndDate.from && eventStartAndEndDate.to
        ? format(eventStartAndEndDate.from, "d ' de 'LLL").concat(' até ').concat(format(eventStartAndEndDate.to, "d ' de 'LLL"))
        : null


    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">

            <div className='flex items-center gap-2 flex-1' >
                <MapPin className='size-5 text-zinc-400' />
                <input disabled={isGuestInputOpen}
                 type="text"
                 placeholder="Para onde você vai? " 
                 className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
                 onChange={event => setDestination(event.target.value)}
                 />
            </div>

            <button onClick={openDatePicker} disabled={isGuestInputOpen} className='flex items-center gap-2 text-left flex-1'>

                <Calendar className='size-5 text-zinc-400' />
                <span className="text-lg text-zinc-400 w-40 flex-1" >
                    {displayedDate || 'Quando'}
                </span>


            </button>

            {isDatePickerOpen && (
                <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                    <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <h2 className="text-lg font-semibold">Selecione a Data</h2>
                                <button type='button' onClick={closeDatePicker}>
                                    <X className='size-5 text-zinc-400' />
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-wrap gap-2'>
                        </div>

                        <DayPicker mode="range" selected={eventStartAndEndDate} onSelect={setEventStartAndEndDate} />



                    </div>

                </div>

            )}



            <div className='w-px h-6 bg-zinc-800' />

            {isGuestInputOpen ? (


                <Button onClick={closeGuestsInput} variant="secondary">
                    Alterar local/data
                    <Settings2 className='size-5 text-zinc-200' />
                </Button>


            ) :

                <Button onClick={openGuestsInput} variant="primary">
                    Continuar
                    <ArrowRight className=' text-lime-950 size-5' />
                </Button>


            }

        </div>
    )
}