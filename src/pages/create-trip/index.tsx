import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestStep } from './steps/invite-guest-step'
import { DateRange } from 'react-day-picker'
import { api } from '../../lib/axios'

export function CreateTripPage() {
    const navigate = useNavigate()

    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

    const [destination, setDestination] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('')
    const [eventStartAndEndDate, setEventStartAndEndDate] = useState<DateRange | undefined>()
    




    const [emailsToInvite, setEmailsToInvite] = useState([
        'werbm.moreira@hotmail.com',
        'werbm@gmail.com'
    ])

    function openGuestsInput() {
        setIsGuestInputOpen(true)
    }

    function closeGuestsInput() {
        setIsGuestInputOpen(false)
    }

    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true)
    }

    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false)
    }

    function openGuestsModal() {
        setIsGuestModalOpen(true)
    }

    function closeGuestsModal() {
        setIsGuestModalOpen(false)
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get('email')?.toString()

        if (!email) {
            return
        }

        if (emailsToInvite.includes(email)) {
            return
        }
        setEmailsToInvite([
            ...emailsToInvite,
            email
        ])

        console.log('Submit')

        event.currentTarget.reset()

    }

    async function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        console.log(destination)
        console.log(eventStartAndEndDate)
        console.log(ownerEmail)
        console.log(ownerName)
        console.log(emailsToInvite)

        if (!destination) {return}
        if (!eventStartAndEndDate?.from || !eventStartAndEndDate?.to) {return}
        if (emailsToInvite.length === 0) {return}
        if (!ownerName || !ownerEmail) {return}

        const response = await api.post("/trips", {
            destination,
            starts_at: eventStartAndEndDate.from,
            ends_at: eventStartAndEndDate.to,
            emails_to_invite: emailsToInvite,
            owner_name: ownerName,
            owner_email: ownerEmail
          })

        const { tripId } = response.data
        
        
       navigate(`/trips/${tripId}`)

    }

    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove)

        setEmailsToInvite(newEmailList)

    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center ">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className='flex flex-col items-center gap-3'>
                    <img className='h-16' src="/logo.svg" alt="plann.er" />
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                </div>

                <div className='space-y-4'>
                    <DestinationAndDateStep
                        isGuestInputOpen={isGuestInputOpen}
                        closeGuestsInput={closeGuestsInput}
                        openGuestsInput={openGuestsInput}
                        setDestination={setDestination}
                        setEventStartAndEndDate={setEventStartAndEndDate}
                        eventStartAndEndDate={eventStartAndEndDate}
                    />

                    

                    {isGuestInputOpen && (

                        <InviteGuestStep 
                            openGuestsModal={openGuestsModal}
                            emailsToInvite={emailsToInvite}
                            openConfirmTripModal={openConfirmTripModal} 
                        />
                        
                    )}
                </div>


                <p className="text-sm text-zinc-500">
                    Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade.</a>
                </p>
            </div>

            {isGuestModalOpen && (
                <InviteGuestsModal 
                    emailsToInvite={emailsToInvite}
                    addNewEmailToInvite={addNewEmailToInvite}
                    closeGuestsModal={closeGuestsModal}
                    removeEmailFromInvites={removeEmailFromInvites}
                
                
                />    
            )}

            {isConfirmTripModalOpen && (
                <ConfirmTripModal 
                    closeConfirmTripModal={closeConfirmTripModal}
                    createTrip={createTrip}
                    setOwnerEmail={setOwnerEmail}
                    setOwnerName={setOwnerName}

                
                />
            )}
        </div>
    )
}


