import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { People } from '~/icons/people'
import { Button } from '~/components/Button'
import { AddFavouriteRecipeForm } from '../AddFavouriteRecipeForm'
import { useActionData } from '@remix-run/react'

interface ModalState {
  open: boolean
}

export function Hero() {
  const defaultModal: ModalState = { open: false }
  const [modalState, setModalState] = useState<ModalState>(defaultModal)
  const cancelButtonRef = useRef(null)
  const errors = useActionData()
  const error = errors?.response?.errors?.[0]?.message
  return (
    <div className="relative overflow-hidden bg-zinc-100">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-zinc-100 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <People />

          <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 md:pt-16 lg:px-8 lg:pt-20 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-2xl text-gray-600">Favourite Recipes</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Add your favourite recipes
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <Button className="flex items-center" size="large" onClick={() => setModalState({ open: true })}>
                  <span className="ml-2">Add favourite recipe</span>
                </Button>
              </div>

              <Transition.Root show={modalState.open} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  initialFocus={cancelButtonRef}
                  onClose={() => setModalState(defaultModal)}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="bg-white px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                              <div className="bg-gray-50 py-3 ">
                                <AddFavouriteRecipeForm
                                  error={error}
                                  onClickHandler={() => {
                                    if (!error) {
                                      setModalState(defaultModal)
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src={`cooking.jpg`}
          alt="Cooking"
        />
      </div>
    </div>
  )
}
