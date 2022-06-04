package org.savadb.backend.service.JPA.Account;

import org.savadb.backend.entity.UserWatchingRegions;
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
        List<UserWatchingRegions> userWatchingRegionsList = jpaUserWatchingRegionsRepo.findAllByUsrId(usrId);

        List<String> regionNameList = new ArrayList<>();

        for (UserWatchingRegions userWatchingRegions : userWatchingRegionsList) {
            regionNameList.add(userWatchingRegions.getRegionByWatchingRId().getRegionName());
        }

        return regionNameList;
    }
}
