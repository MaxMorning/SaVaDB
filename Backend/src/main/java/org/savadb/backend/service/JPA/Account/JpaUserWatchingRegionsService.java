package org.savadb.backend.service.JPA.Account;

import org.savadb.backend.entity.UserWatchingRegionsEntity;
import org.savadb.backend.repo.Account.JpaUserWatchingRegionsRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class JpaUserWatchingRegionsService {
    @Resource
    private JpaUserWatchingRegionsRepo jpaUserWatchingRegionsRepo;

    public List<String> getAllWatchingRegions(int usrId) {
        List<UserWatchingRegionsEntity> userWatchingRegionsEntityList = jpaUserWatchingRegionsRepo.findAllByUsrId(usrId);

        List<String> regionNameList = new ArrayList<>();

        for (UserWatchingRegionsEntity userWatchingRegionsEntity : userWatchingRegionsEntityList) {
            regionNameList.add(userWatchingRegionsEntity.getRegionByWatchingRId().getRegionName());
        }

        return regionNameList;
    }

    public UserWatchingRegionsEntity getUserWatchingEntity(Integer usrId, Integer regionId) {
        return jpaUserWatchingRegionsRepo.checkSubscribe(usrId, regionId);
    }

    public boolean checkSubscribeRegion(Integer usrId, Integer regionId) {
        UserWatchingRegionsEntity userWatchingRegions = getUserWatchingEntity(usrId, regionId);

        return userWatchingRegions != null;
    }

    public void saveWatchingEntity(UserWatchingRegionsEntity userWatchingRegions) {
        jpaUserWatchingRegionsRepo.save(userWatchingRegions);
    }

    public void deleteEntity(UserWatchingRegionsEntity userWatchingRegions) {
        jpaUserWatchingRegionsRepo.delete(userWatchingRegions);
    }
}
