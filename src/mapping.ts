import {YfiEvent} from "../generated/schema";
import {ethereum} from "@graphprotocol/graph-ts/chain/ethereum"
import {
    RewardPaid,
    Staked,
    Withdrawn
} from "../generated/YearnGovernance/YearnGovernance";

export function handleStaked(event: Staked): void {
    let yfiEvent = new YfiEvent(event.transaction.hash.toHex())
    yfiEvent.eventType = "STAKED"
    yfiEvent.amount = event.params.amount
    setPropertiesAndSave(event, yfiEvent)
}

export function handleRewardPaid(event: RewardPaid): void {
    let yfiEvent = new YfiEvent(event.transaction.hash.toHex())
    yfiEvent.eventType = "REWARDPAID"
    yfiEvent.amount = event.params.reward
    setPropertiesAndSave(event, yfiEvent)
}

export function handleWithdrawn(event: Withdrawn): void {
    let yfiEvent = new YfiEvent(event.transaction.hash.toHex())
    yfiEvent.eventType = "WITHDRAWN"
    yfiEvent.amount = event.params.amount
    setPropertiesAndSave(event, yfiEvent)
}

function setPropertiesAndSave(event: ethereum.Event, yfiEvent: YfiEvent): void {
    yfiEvent.user = event.transaction.from
    yfiEvent.blockNumber = event.block.number
    yfiEvent.blockTimestamp = event.block.timestamp
    yfiEvent.save()
}